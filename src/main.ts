import './styles/common.scss';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Blackout from './components/Blackout';
import ContactAside from './components/Aside/contactAside';
import GroupAside from './components/Aside/groupAside';
import LocalStorage from './db/localStorage';

const app = document.getElementById('app');

LocalStorage.__updateGroupsLS();
app?.append(Blackout, Header, ContactAside, GroupAside(), Contacts());
