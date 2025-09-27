export interface FarmerInput {
  location: string;
  plantingMonth: string;
  cropMaturityTime: string;
  financialCapital:  number;
  areaOfLand:  number;
  soilType: string;
topographyOfLand: string;
  waterSource: string;
  waterAvailability: string;
  numberOfLabors: number;
  objectivesOfFarmer: string;
}

export interface AgricultureAdvice {
title:string;
description:string;
}