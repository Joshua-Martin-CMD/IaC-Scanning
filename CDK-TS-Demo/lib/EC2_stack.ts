import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cmd_cdk from '../cdk.json';
import * as env_helper from './env_config' 
import { Construct } from 'constructs';


export class CdkTsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, 
    environment: keyof typeof cmd_cdk.env_config,
    props?: cdk.StackProps) {
    super(scope, id, props);

    const proj_vpcId = cmd_cdk.env_config[environment]['Vpc_Id']

    const vpc = ec2.Vpc.fromLookup(this,
      'VPC-Lookup', {
        vpcId: proj_vpcId
      })
  }
}
