#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTsDemoStack } from '../lib/EC2_stack';

const app = new cdk.App();

const environment = app.node.tryGetContext('environment')
new CdkTsDemoStack(app, 'CdkTsDemoStack', 
environment,
{
});