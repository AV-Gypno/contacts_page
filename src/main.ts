import './styles/common.scss';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Blackout from './components/Blackout';
import ContactAside from './components/Aside/contactAside';
import GroupAside from './components/Aside/groupAside';

const app = document.getElementById('app');

app?.append(Blackout, Header, ContactAside, GroupAside, Contacts());
