import { ModuleAbbr } from '~/app/constants/module.constant';
import { SUBMODULES } from './submodules.constant';
type ModuleAsUnion = keyof typeof ModuleAbbr;
type RouteItem = {
    name: string;
    path?: string;
    componentName?: string;
    onNext: string;
    onBack: string;
    meta?: {
      onNext: string;
      module: string;
      name: string;
      onBack: string;
    };
  };

export type PageItem = {
    routes: RouteItem[];
  };

export const PAGE_ROUTES: RouteItem[] = [];

function generatePath(
    moduleAbbr: ModuleAsUnion,
    name: string,
  ) {
    const pageName = name.replace(/ /g, '');
    const pathName = name.replace(/\s+/g, '-').toLowerCase();
    const modulePath = moduleAbbr.toLowerCase();
    const path = '/' + modulePath + '/' + pathName;
    return { pageName, path };
  }

export const generatePageItem = (
    moduleAbbr: ModuleAsUnion,
    pageItem: PageItem
  ) => {
    const { routes } = pageItem;
    
    routes.forEach(({ name, onNext, onBack }) => {
        const { pageName, path } = generatePath(moduleAbbr, name);
        PAGE_ROUTES.push({
          name: `${moduleAbbr}${pageName}`,
          path,
          onNext,
          onBack,
          componentName: `${moduleAbbr}/Page${moduleAbbr}${pageName}.vue`,
          meta: {
            module: moduleAbbr,
            name,
            onNext,
            onBack
          },
        });
      });
  }

(Object.keys(SUBMODULES) as ModuleAsUnion[]).forEach((moduleName) => {
    generatePageItem(moduleName, SUBMODULES[moduleName]);
  });
  