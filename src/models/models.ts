
export interface ServerResponse<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage?: any;
    nextPage: number;
  }
  
  export interface IUser {
    fairings?: Fairing;
    links: Links;
    static_fire_date_utc?: string;
    static_fire_date_unix?: number;
    net: boolean;
    window: number;
    rocket: string;
    success: boolean;
    failures: (Failure | Failures2)[];
    details?: string;
    crew: any[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Core[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id?: any;
    id: string;
  }
  
  export interface Core {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success?: any;
    landing_type?: any;
    landpad?: any;
  }
  
  export interface Failures2 {
    time: number;
    altitude: number;
    reason: string;
  }
  
  export interface Failure {
    time: number;
    altitude?: any;
    reason: string;
  }
  
  export interface Links {
    patch: Patch;
    reddit: Reddit;
    flickr: Flickr;
    presskit?: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  }
  
  export interface Flickr {
    small: any[];
    original: any[];
  }
  
  export interface Reddit {
    campaign?: any;
    launch?: string;
    media?: any;
    recovery?: any;
  }
  
  export interface Patch {
    small: string;
    large: string;
  }
  
  export interface Fairing {
    reused?: boolean;
    recovery_attempt?: boolean;
    recovered?: boolean;
    ships: any[];
  }