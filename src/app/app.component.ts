import { Component } from '@angular/core';
import { NgThemeService } from './ng-theme/ng-theme.service';
import { parseCurl } from 'sweet-curl-parser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  urlFc: FormControl = new FormControl('');

  onCurlPaste(event) {
    setTimeout(()=>{
      if (event?.target?.value) {
        try {
          const result =  parseCurl(event?.target?.value);
          console.log('Curl string to object ', result);
  
          if (result?.success) {
  
            // body content
            const bodyContent = result?.data?.body?.content || '';
            const contentType = result?.data?.headers?.find(h => h?.name?.toLowerCase() === 'content-type')?.value;
  
            if (bodyContent && typeof bodyContent === 'string') {
              if (contentType.includes('application/json')) {
                console.log('Raw payload ', JSON.parse(bodyContent));
              }  else if (contentType.includes('multipart/form-data')) {
                const multipartData = this.parseMultipartFormData(bodyContent, contentType);
                console.log('Form data payload ', multipartData);
              }
            }
  
            const fullUrl = result?.data?.url?.fullUrl;
            if (fullUrl) this.urlFc?.setValue(fullUrl);
  
          } else {
            console.error('Error ', result?.errors?.[0]?.message);
          }
        } catch (error) {
          console.error('Parse error:', error?.message);
        }
      }

    }, 100);
  }

  parseMultipartFormData(body: string,contentType: string) {

    const result = {};

    // extract boundary
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) return result;

    const boundary = boundaryMatch[1];

    // normalize escaped newlines
    const normalizedBody = body
      ?.replace(/^[$]/, '')     // remove leading $
      ?.replace(/\\r\\n/g, '\r\n');

    const parts = normalizedBody.split(`--${boundary}`);

    for (const part of parts) {
      if (!part || part === '--\r\n') continue;

      const nameMatch = part?.match(/name="([^"]+)"/);
      if (!nameMatch) continue;

      const name = nameMatch[1];

      const valueMatch = part?.split('\r\n\r\n');
      if (valueMatch?.length < 2) continue;

      const value = valueMatch?.[1]?.replace(/\r\n$/, '');

      result[name] = value;
    }

    return result;
  }

}
