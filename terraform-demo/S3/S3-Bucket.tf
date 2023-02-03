resource "aws_s3_bucket" "IaC_scanning" {
    bucket = "${var.bucket_name}"
    acl = "${var.acl_value}"
  
}