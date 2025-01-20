import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import * as fs from 'fs';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Apiary } from '../apiaries/schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HiveMediaService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}
  async uploadFileToPrdict(
    file: Express.Multer.File,
    res: Response,
    hiveId: string,
    apiaryId: string,
  ) {
    try {
      if (!file) {
        throw new HttpException('No image provided', HttpStatus.BAD_REQUEST);
      }
      console.log(`here is the file ${file}`);
      const formData = new FormData();
      formData.append('image', fs.createReadStream(file.path));

      const targetUrl = `${process.env.Py_Server_url}/upload`;
      const response = await axios.post(targetUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Handle the response from the target server
      if (response.status === 200) {
        if (response.data.trim() == 'Diseased') {
          await this.addDiseased(hiveId, apiaryId);
        }
        return res.status(HttpStatus.OK).json({
          message: 'Image uploaded successfully!',
          result: response.data,
        });
      } else {
        throw new HttpException(
          `Target server returned status ${response.status}`,
          HttpStatus.BAD_GATEWAY,
        );
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw new HttpException(
        'Error uploading image: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      fs.unlink(file.path, (err) => {
        if (err) throw err;
        console.log('File deleted');
      });
    }
  }

  async addDiseased(hiveId: string, apiaryId: string) {
    const apiary = await this.apiaryModel.findOneAndUpdate(
      { _id: apiaryId, 'hives._id': hiveId },
      {
        $push: {
          'hives.$.diseases': 'Varroe Mites',
        },
      },
      {
        new: true,
        projection: { hives: 1 },
      },
    );
    if (!apiary)
      throw new NotFoundException('Apiary to update harvest is not found');
    return apiary;
  }
}
