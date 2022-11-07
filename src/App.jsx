import { Layout } from 'antd';
import CustomHeader from './components/CustomHeader';
import NewsContextProvider from './contexts/NewsContext';
import Filters from './components/Filters';
import NewsList from './components/NewsList';
import Paginator from './components/Paginator';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <NewsContextProvider>
          <CustomHeader />
          <Content>
            <Filters />
            <NewsList />
            <Paginator />
          </Content>
        </NewsContextProvider>
      </Layout>
    </>
  );
}

export default App;
