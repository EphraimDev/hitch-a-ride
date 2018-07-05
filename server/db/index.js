import usersTable from './users';
import offersTable from './offerRequests';
import joinTable from './joinRequests';
import dummyUser from './dummy-db/dummy-user';
import dummyOffers from './dummy-db/dummy-offers';
import dummyRequests from './dummy-db/dummy-requests';

usersTable();
setTimeout(offersTable, 500);
setTimeout(joinTable, 1000);
setTimeout(dummyUser, 1500);
setTimeout(dummyOffers, 2000);
setTimeout(dummyRequests, 2500);
