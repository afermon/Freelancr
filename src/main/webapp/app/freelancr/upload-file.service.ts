import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {UserFreelancrFreelancrService} from '../entities/user-freelancr-freelancr';

@Injectable()
export class UploadFileService {

    FOLDER = 'cv/';
    constructor(
        private userFreelancrService: UserFreelancrFreelancrService
    ) {}

    uploadfile(file, userAccount, fileType) {

        const bucket = new S3(
            {
                accessKeyId: '<S3 access key id>',
                secretAccessKey: '<S3 access key>',
                region: 'us-east-2'
            }
        );

        const params = {
            Bucket: 'files.freelancr.me',
            Key: this.FOLDER + file.name,
            Body: file,
            ACL: 'public-read'
        };

        bucket.upload(params, (err, data) => {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }

            if (fileType === 'cv') {
                userAccount.resumeLink = data.Key;
                this.userFreelancrService.update(userAccount)
                    .subscribe();
            }
            console.log('Successfully uploaded file.', data);
            return true;
        });

    }

}
