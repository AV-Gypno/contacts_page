import './styles/common.scss';
import Header from './components/Header';
import Aside from './components/Aside';
import Contacts from './components/Contacts';
import Blackout from './components/Blackout';

const app = document.getElementById('app');

app?.append(Blackout, Header, Aside(), Contacts());
