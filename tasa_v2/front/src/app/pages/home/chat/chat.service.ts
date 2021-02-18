import { Injectable } from '@angular/core';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import { environment } from 'src/environments/environment';
import moment from 'moment';
import { LandsService } from '../farms/calendar/lands.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  conversation = [];
  scrollPerson = false;
  count = 0;

  constructor(
    public dataApiService: DataApiService,
    public landsService: LandsService,
  ) { 
  }

  getMessage(idLand?, idProperty ?) {
    this.landsService.idLand = idLand? idLand : this.landsService.idLand;
    this.landsService.idProperty = idProperty? idProperty : this.landsService.idProperty;
    const idLandSent = parseInt(this.landsService.idLand);
    return this.dataApiService.getAll(`get_chat_message?land_id=${idLandSent}`, environment.urlNotifications).then((chat) => {
      this.conversation = chat[0].map((data) => {
        data.created_date = moment(data.created_date).format('hh:mm A');
        return data;
      });
    })
  }
}
