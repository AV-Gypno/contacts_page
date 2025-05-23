import './styles/common.scss';
import Header from './components/Header';
import Aside from './components/Aside';

const app = document.getElementById('app');

app?.append(Header, Aside());
