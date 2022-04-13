function BaseLayout(props: { children: any }) {
  return (
    <div className="App w-full max-h-screen p-10 bg-gradient-to-r from-cyan-500 to-blue-500">
      {props.children}
    </div>
  );
}
export default BaseLayout;
