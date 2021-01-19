import { ModuleAbbr } from '~/app/constants/module.constant';
import { PageItem } from './pageList';

type ModuleAsUnion = keyof typeof ModuleAbbr;
type Pages = {
    [S in ModuleAsUnion]-?: PageItem;
  };
  export const SUBMODULES: Pages = {
    Outlet: {
      routes: [
        { 
          onBack: '/', 
          onNext: '/room/bed-type', 
          name: 'Departement Setup'},
      ]
    },
    Room: {
      routes: [
        { 
          onBack: '/outlet/departement-setup', 
          onNext: '/room/category', 
          name: 'Bed Type' },
        { 
          onBack: '/room/bed-type', 
          onNext: '/room/outlook', 
          name: 'Category' 
        },
        { 
          onBack: '/room/category', 
          onNext: '/room/preferenence-code', 
          name: 'Outlook' },
        { 
          onBack: '/room/outlook', 
          onNext: '/room/guest-room', 
          name: 'Preferenence Code' 
        },
        { 
          onBack: '/room/preferenence-code', 
          onNext: '/room/floor-plan', 
          name: 'Guest Room' 
        },
        { 
          onBack: '/room/guest-room', 
          onNext: '/guestprofile/individual-guest', 
          name: 'Floor Plan' 
        }
      ],
    },
    GuestProfile: {
      routes: [
        { 
          onBack: '/room/floor-plan', 
          onNext: '/guestprofile/guest-document', 
          name: 'Individual Guest' 
        },
        { 
          onBack: '/guestprofile/individual-guest', 
          onNext: '/guestprofile/guest-relation-title', 
          name: 'Guest Document' 
        },
        { 
          onBack: '/guestprofile/guest-document', 
          onNext: '/guestprofile/vip-code', 
          name: 'Guest Relation Title' 
        },
        { 
          onBack: '/guestprofile/guest-relation-title', 
          onNext: '/guestprofile/country-local-region', 
          name: 'VIP Code' 
        },
        { 
          onBack: '/guestprofile/vip-code', 
          onNext: '/salesrelated/tax-and-service', 
          name: 'Country Local Region' 
        },
      ],
    },
    SalesRelated: {
      routes: [
        { 
          onBack: '/guestprofile/country-local-region', 
          onNext: '/salesrelated/local-and-foreign-currency', 
          name: 'Tax And Service' 
        },
        { 
          onBack: '/salesrelated/tax-and-service', 
          onNext: '/salesrelated/billing-article', 
          name: 'Local And Foreign Currency' 
        },
        { 
          onBack: '/salesrelated/local-and-foreign-currency', 
          onNext: '/reservation/segment-code', 
          name: 'Billing Article' 
        }
      ],
    },
    Reservation: {
      routes: [
        { 
          onBack: '/salesrelated/billing-article', 
          onNext: '/reservation/sorce-of-booking', 
          name: 'Segment Code' 
        },
        { 
          onBack: '/reservation/segment-code', 
          onNext: '/reservation/purpose-of-stay', 
          name: 'Sorce Of Booking' 
        },
        { 
          onBack: '/reservation/sorce-of-booking', 
          onNext: '/reservation/guest-special-request', 
          name: 'Purpose Of Stay'
        },
        { 
          onBack: '/reservation/purpose-of-stay', 
          onNext: '/reservation/reservation-cancellation-reason', 
          name: 'Guest Special Request' 
        },
        { 
          onBack: '/reservation/purpose-of-stay', 
          onNext: '/reservation/segment-code', 
          name: 'Reservation Cancellation Reason' 
        },
      ]
    },
    User: {
      routes: [
        { onBack: '/', onNext: '/', name: 'Users Access Right Setup'},
      ]
    },
    Restaurant: {
      routes: [
        { onBack: '/', onNext: '/', name: 'Dinning Table'},
        { onBack: '/', onNext: '/', name: 'Table Plan'},
        { onBack: '/', onNext: '/', name: 'Outlet Article'},
        { onBack: '/', onNext: '/', name: 'Happy Hour'},
        { onBack: '/', onNext: '/', name: 'Cancel Order Reaseon'},
        { onBack: '/', onNext: '/', name: 'Restaurant Bill Footnote'},
      ]
    },
  }