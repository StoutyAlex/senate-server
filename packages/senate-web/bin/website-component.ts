import { App } from 'aws-cdk-lib'
import { SenateWebsite, SenateWebsiteProps } from '../cdk/website-stack'

const app = new App()
git 
const config: SenateWebsiteProps = {
    domainName: 'senateserver.co.uk',
    bucketName: 'senate-server-website-frontend',
    certificateArn: 'arn:aws:acm:eu-west-1:477948800870:certificate/234eb11e-59d3-4acb-abac-4753d376fd22',
    hostedZone: {
        id: 'Z031958332WIF5IG4KX9O',
        name: 'senateserver.co.uk'
    }
}

new SenateWebsite(app, 'senate-website', config)
