
import './App.css';
import Header from './components/Header';
import MainContainer from "./components/MainContainer"
import CreateContainer from "./components/CreateContainer"
import { Routes,Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getAllFoddItems } from './utils/FireBaseFunctions';
import { useEffect } from 'react';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
function App() {
  const [{foodItems},dispatch]=useStateValue()
const fetchData=async()=>{
   await getAllFoddItems()?.then(data=>{
dispatch({
  type:actionType.SET_FOOD_ITEMS,
  foodItems:data
})
   })


}
useEffect(() => {
  fetchData()

  
},[])

  return (
    <AnimatePresence exitBeforeEnter>

   <div className='w-screen h-auto flex bg-primary flex-col'>
    <Header/>
    <main className=' mt-16 md:mt-24 w-full px-4 py-4 md:px-16'>
      <Routes>
        <Route path='/*' element={<MainContainer/>}/>
        <Route path='/createItem' element={<CreateContainer/>}/>
        
      </Routes>
    </main>
   </div>
    </AnimatePresence>
  
  );
}

export default App;
