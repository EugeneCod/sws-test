import { Header, Navbar, Table } from '@/components';

import s from './App.module.scss';

function App() {
  return (
    <main className={s.root}>
      <Header className={s.header}/>
      <Navbar className={s.navbar}/>
      <Table className={s.table}/>
    </main>
  );
}

export default App;
