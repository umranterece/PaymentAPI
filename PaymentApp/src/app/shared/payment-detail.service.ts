import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url:string=environment.apiBaseUrl+'PaymentDetail'; 
  list:PaymentDetail[]=[];
  formData:PaymentDetail=new PaymentDetail();
  formSubmitted:boolean=false;
  constructor(private http:HttpClient) { 

  }

  refreshList(){
    this.http.get(this.url).subscribe({
      next:res=>{
        console.log(res);
        this.list=res as PaymentDetail[];
      },
      error:res=>{
        console.log(res);
      }
    });
  }

  postPaymentDetail(){
    return this.http.post(this.url,this.formData);
  }

  putPaymentDetail(){
    return this.http.put(this.url+'/'+this.formData.paymentDetailId,this.formData);
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.formData=new PaymentDetail();
    this.formSubmitted=false;
  }

  deletePaymentDetail(id:number){
    return this.http.delete(this.url+'/'+id);
  }
}
