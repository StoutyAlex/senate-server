import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import { Bucket, BucketEncryption, BlockPublicAccess } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { HostedZone, ARecord, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { Construct } from 'constructs'
import path from 'path'

export interface SenateWebsiteProps extends cdk.StackProps {
    domainName: string
    bucketName: string
    certificateArn: string
    hostedZone: {
        id: string
        name: string
    }
}

export class SenateWebsite extends cdk.Stack {
    constructor(scope: Construct, id: string, props: SenateWebsiteProps) {
        super(scope, id, props)

        const s3Bucket = new Bucket(this, 'SenateWebsiteFrontend', {
            bucketName: props.bucketName,
            encryption: BucketEncryption.S3_MANAGED,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: '404.html',
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        })

        const senateHostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
            hostedZoneId: props.hostedZone.id,
            zoneName: props.hostedZone.name,
        })

        new BucketDeployment(this, `TaxManagerFrontendDeployment`, {
            destinationBucket: s3Bucket,
            sources: [Source.asset(path.resolve(__dirname, '../out'))],
        })

        const oia = new cloudfront.OriginAccessIdentity(this, 'OIA', {
            comment: 'Created by CDK',
        })

        s3Bucket.grantRead(oia)

        const certificate = Certificate.fromCertificateArn(this, 'CertificateARN', props.certificateArn)

        const frontendDistribution = new cloudfront.CloudFrontWebDistribution(this, 'SenateWebsiteFrontendDistribution', {
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
              aliases: [props.domainName],
              securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            }),
            originConfigs: [
              {
                s3OriginSource: {
                  s3BucketSource: s3Bucket,
                  originAccessIdentity: oia,
                },
                behaviors: [{ isDefaultBehavior: true }],
              },
            ],
            errorConfigurations: [
              {
                errorCode: 404,
                responseCode: 404,
                responsePagePath: '/404.html',
              },
            ],
        })

        new ARecord(this, `domain`, {
            recordName: 'senate-server',
            zone: senateHostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(frontendDistribution)),
        })
    }
}
