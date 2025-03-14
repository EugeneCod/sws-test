import { Header, Navbar, Table } from '@/components';

import s from './App.module.scss';

function App() {
  return (
    <main className={s.root}>
      <Header />
      <Navbar />
      <Table />
    </main>
  );
}

export default App;
