export const WeatherAPIEndpoint = "https://api.weather.gov/gridpoints/MLB/58,51/forecast";

export interface WeatherData {
    "@context"?: [string, Context]
    type?: string
    geometry?: Geometry
    properties?: Properties
  }
  
  export interface Context {
    "@version"?: string
    wx?: string
    geo?: string
    unit?: string
    "@vocab"?: string
  }
  
  export interface Geometry {
    type?: string
    coordinates?: number[][][]
  }
  
  export interface Properties {
    updated?: string
    units?: string
    forecastGenerator?: string
    generatedAt?: string
    updateTime?: string
    validTimes?: string
    elevation?: Elevation
    periods?: Period[]
  }
  
  export interface Elevation {
    unitCode?: string
    value?: number
  }
  
  export interface Period {
    number?: number
    name?: string
    startTime?: string
    endTime?: string
    isDaytime?: boolean
    temperature?: number
    temperatureUnit?: string
    temperatureTrend?: any
    probabilityOfPrecipitation?: ProbabilityOfPrecipitation
    dewpoint?: Dewpoint
    relativeHumidity?: RelativeHumidity
    windSpeed?: string
    windDirection?: string
    icon?: string
    shortForecast?: string
    detailedForecast?: string
  }
  
  export interface ProbabilityOfPrecipitation {
    unitCode?: string
    value?: number
  }
  
  export interface Dewpoint {
    unitCode?: string
    value?: number
  }
  
  export interface RelativeHumidity {
    unitCode?: string
    value?: number
  }
  