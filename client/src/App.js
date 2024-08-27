import './App.css';

function App() {
  return (
    <>
    <div className='w-[100%] p-[40px] bg-slate-600 flex justify-center items-center'>
      <h1 className='text-white text-[35px] font-semibold'>Hello World</h1>
    </div>

    <div className='flex justify-around p-[40px]'>
      <div className='w-[100px] h-[100px] bg-slate-700 rounded-md'></div>
      <div className='w-[100px] h-[100px] bg-slate-700 rounded-md'></div>
      <div className='w-[100px] h-[100px] bg-slate-700 rounded-md'></div>
    </div>

    </>
  );
}

export default App;
