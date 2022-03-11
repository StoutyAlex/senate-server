import { App } from 'aws-cdk-lib'
import { SenateWebsite, SenateWebsiteProps } from '../cdk/website-stack'

const app = new App()

const config: SenateWebsiteProps = {
    domainName: 'senate-server.co.uk',
    bucketName: 'senate-server-website-frontend',
    certificateArn: 'arn:aws:acm:eu-west-1:477948800870:certificate/86984a38-25e9-4da4-9400-847ad87d023a',
    hostedZone: {
        id: 'Z031958332WIF5IG4KX9O',
        name: 'senateserver.co.uk'
    }
}

new SenateWebsite(app, 'senate-website', config)
