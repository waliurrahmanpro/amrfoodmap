import { District, DistrictStats } from '@/types';
import { DISTRICTS } from '@/data/districts';
import { FOODS, FOODS_BY_DISTRICT } from '@/data/foods';

export interface OverallStats {
  totalDistricts: number;
  totalFoods: number;
  triedFoodsCount: number;
  exploredDistrictsCount: number; // >= 1 food tried
  completedDistrictsCount: number; // all foods tried
  overallPercentage: number;
  explorerLevel: {
    titleEn: string;
    titleBn: string;
    badgeColor: string;
  };
}

export function calculateDistrictStats(
  district: District,
  triedFoodIds: string[]
): DistrictStats {
  const districtFoods = FOODS_BY_DISTRICT[district.id] || [];
  const totalFoods = districtFoods.length;

  if (totalFoods === 0) {
    return {
      district,
      totalFoods: 0,
      triedFoods: 0,
      percentage: 0,
      status: 'unexplored'
    };
  }

  const triedFoods = districtFoods.filter((f) => triedFoodIds.includes(f.id)).length;
  const percentage = Math.round((triedFoods / totalFoods) * 100);

  let status: DistrictStats['status'] = 'unexplored';
  if (triedFoods === totalFoods) {
    status = 'completed';
  } else if (triedFoods > 0) {
    status = 'in-progress';
  }

  return {
    district,
    totalFoods,
    triedFoods,
    percentage,
    status
  };
}

export function calculateOverallStats(triedFoodIds: string[]): OverallStats {
  const totalDistricts = DISTRICTS.length;
  const totalFoods = FOODS.length;
  const triedSet = new Set(triedFoodIds);

  const triedFoodsCount = FOODS.filter((f) => triedSet.has(f.id)).length;
  const overallPercentage = totalFoods > 0 ? Math.round((triedFoodsCount / totalFoods) * 100) : 0;

  let exploredDistrictsCount = 0;
  let completedDistrictsCount = 0;

  for (const district of DISTRICTS) {
    const foods = FOODS_BY_DISTRICT[district.id] || [];
    if (foods.length === 0) continue;

    const triedInDistrict = foods.filter((f) => triedSet.has(f.id)).length;
    if (triedInDistrict > 0) {
      exploredDistrictsCount++;
      if (triedInDistrict === foods.length) {
        completedDistrictsCount++;
      }
    }
  }

  let explorerLevel = {
    titleEn: 'Foodie Novice',
    titleBn: 'নবীন রসনাবিলাসী',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  };

  if (overallPercentage >= 100) {
    explorerLevel = {
      titleEn: 'Grand Legend of Bengal',
      titleBn: 'মহাভোজন মহারাজ',
      badgeColor: 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-300'
    };
  } else if (overallPercentage >= 75) {
    explorerLevel = {
      titleEn: 'Bengal Connoisseur',
      titleBn: 'স্বাদসম্রাট',
      badgeColor: 'bg-lime-200 text-emerald-950 border-lime-400'
    };
  } else if (overallPercentage >= 50) {
    explorerLevel = {
      titleEn: 'Master Taste Explorer',
      titleBn: 'বাংলার খাঁটি ভোজনরসিক',
      badgeColor: 'bg-emerald-200 text-emerald-900 border-emerald-400'
    };
  } else if (overallPercentage >= 25) {
    explorerLevel = {
      titleEn: 'Heritage Gastronome',
      titleBn: 'স্বাদসন্ধানী পরিব্রাজক',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
    };
  } else if (overallPercentage >= 10) {
    explorerLevel = {
      titleEn: 'District Explorer',
      titleBn: 'দেশভ্রমণ রসিক',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    };
  }

  return {
    totalDistricts,
    totalFoods,
    triedFoodsCount,
    exploredDistrictsCount,
    completedDistrictsCount,
    overallPercentage,
    explorerLevel
  };
}
