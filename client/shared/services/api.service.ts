import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  head(url: string, params?: HttpParams, options?: any): Observable<any> {
    options = this.prepareOptions(options);
    options.params = params;
    return this.http.head(url, options);
  }

  get(url: string, params?: HttpParams, options?: any): Observable<any> {
    options = this.prepareOptions(options);
    options.params = params;
    return this.http.get(url, options);
  }

  delete(url: string, params?: HttpParams, options?: any): Observable<any> {
    options = this.prepareOptions(options);
    options.params = params;
    return this.http.delete(url, options);
  }

  post(url: string, body: any|null, options?: any): Observable<any> {
    options = this.prepareOptions(options);
    return this.http.post(url, body, options);
  }

  put(url: string, body: any|null, options?: any): Observable<any> {
    options = this.prepareOptions(options);
    return this.http.put(url, body, options);
  }

  patch(url: string, body?: any, options?: any): Observable<any> {
    options = this.prepareOptions(options);
    return this.http.patch(url, body, options);
  }

  prepareOptions(options?: any): any {
    options = options || {};
    options.observe = 'response';
    options.headers = options.headers || new HttpHeaders();
    options.headers = options.headers.set('Accept', 'application/json');
    return options
  }

  parsePaginationLink(link?: string): any {
    if (link) {
      const linkRe = /<([^>]+)>; rel="([^"]+)"/g;
      const pageRe = /(?:\?|&)page=(\d)+/;
      const urls = {};
      let m;
      while ((m = linkRe.exec(link)) !== null) {
        let url = m[1];
        if (!isDevMode()) {
          //// workaround for broken links- django returns http:// instead of https:// in prod
          //// causing mixed-mode content blocking errors
          url = url.replace('http://', 'https://');
        }
        urls[m[2]] = url;
      }
      return urls;
    } else {
      return {};
    }
  }

  invites = {
    index: (params?: HttpParams): Observable<any> => {
      return this.get('/api/invites/', params);
    },
    create: (record: any): Observable<any> => {
      return this.post('/api/invites/', record);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/invites/${id}/`);
    },
    revoke: (id: string): Observable<any> => {
      return this.delete(`/api/invites/${id}/`);
    }
  };

  memberships = {
    index: (params?: HttpParams): Observable<any> => {
      return this.get('/api/memberships/', params);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/memberships/${id}/`);
    },
    revoke: (id: string): Observable<any> => {
      return this.delete(`/api/memberships/${id}/`);
    }
  };

  properties = {
    index: (params?: HttpParams): Observable<any> => {
      return this.get('/api/properties/', params);
    },
    create: (record: any): Observable<any> => {
      return this.post('/api/properties/', record);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/properties/${id}/`);
    },
    update: (id: string, record: any): Observable<any> => {
      return this.patch(`/api/properties/${id}/`, record)
    },
    delete: (id: string): Observable<any> => {
      return this.delete(`/api/properties/${id}/`);
    }
  };

  reports = {
    index: (params?: HttpParams): Observable<any> => {
      return this.get('/api/reports/', params);
    },
    get: (id: string): Observable<any> => {
      return this.get(`/api/reports/${id}/`);
    },
  };

  users = {
    me: (params?: HttpParams): Observable<any> => {
      return this.get('/api/users/me/', params);
    },
    index: (params?: HttpParams): Observable<any> => {
      return this.get('/api/users/', params);
    }
  };
}
