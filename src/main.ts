import './styles/common.scss';
import Header from './components/Header';
import Contacts from './components/Contacts';
import Blackout from './components/Blackout';
import ContactAside from './components/Aside/contactAside';
import GroupAside from './components/Aside/groupAside';
import TopBlackout from './components/Blackout/TopBlackout';
import Toast from './components/Toast';

const app = document.getElementById('app');

app?.append(TopBlackout(), Blackout(), Header(), ContactAside(), GroupAside(false)(), Contacts(), Toast());
