import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cmd_cdk from '../cdk.json';
import * as env_helper from './env_config';
import { Construct } from 'constructs';


export class CdkTsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, 
    environment: keyof typeof cmd_cdk.env_config,
    props?: cdk.StackProps) {
    super(scope, id, props);

    //const proj_vpcId = cmd_cdk.env_config[environment]['Vpc_Id']
    //const proj_ami = cmd_cdk.env_config[environment].instance['ami-id']

    const vpc = new ec2.Vpc(this, 'DemoVPC' , {
      cidr: "10.10.0.0/16"
    })

   // const vpclookup = ec2.Vpc.fromLookup(this,
    //  'VPC-Lookup', {
    //    vpcId: proj_vpcId // lookup from cdk.json for VPCID in the dev,uat or prod account
    //  })
    
      const securityGroup = new ec2.SecurityGroup(
        this,
        'IaC-Demo-sg',
        {
          vpc: vpc,
          allowAllOutbound: true, // will let your instance send outboud traffic
          securityGroupName: 'IaC-Demo-sg',
        }
      )
  
      // lets use the security group to allow inbound traffic on specific ports
      securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        'Allows SSH access from Internet'
      )
  
      securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(80),
        'Allows HTTP access from Internet'
      )
  
      securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(443),
        'Allows HTTPS access from Internet'
      )
    
    const instance = new ec2.Instance(this, 'Linux-Instance', {
      vpc: vpc,
      securityGroup: securityGroup,
      instanceName: 'IaC-Demo_instance',
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.C6G,
        ec2.InstanceSize.MICRO
        ),
        machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        })
      })
    

    
  }
}
