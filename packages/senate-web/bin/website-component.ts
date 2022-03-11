import { App } from 'aws-cdk-lib'
import { SenateWebsite, SenateWebsiteProps } from '../cdk/website-stack'

const app = new App()

const config: SenateWebsiteProps = {
    domainName: 'senateserver.co.uk',
    bucketName: 'senate-server-website-frontend',
    certificateArn: 'arn:aws:acm:us-east-1:477948800870:certificate/5bed17dc-f3ee-49b9-b8b4-bbb8b36a69b7',
    hostedZone: {
        id: 'Z031958332WIF5IG4KX9O',
        name: 'senateserver.co.uk'
    }
}

new SenateWebsite(app, 'senate-website', config)
