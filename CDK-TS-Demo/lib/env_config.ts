import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cmd_cdk from '../cdk.json';


export const env_helper ={
    proj_name: 'CMD',
    SUBNET_TYPE: "PRIVATE",
    ENV_UAT: "uat",
    ENV_DEV: "dev",
    ENV_PROD: "prod",
    DEPLOY_ENVS: ["PROD", "DEV", "UAT"],
};
