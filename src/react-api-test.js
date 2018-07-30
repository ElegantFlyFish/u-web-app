import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style/modal.less';

class Clock extends Component{
    constructor(props){
        super(props)
        this.state = { 
            date: new Date()
        }
    }
    componentDidMount(){
        this.tick()
    }
    componentWillUnmount(){
        clearInterval(this.timeId)
    }
    tick(){
        this.timeId = setInterval(() => {
            this.setState({
                date:(new Date()).getTime()
            })
        }, 1000)
    }
    render(){
        return (
            <div>
                {this.state.date+''}
            </div>
        )
    }
}

class Toggle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isToggleOn: true,
            id: 1
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(n, e){
        this.setState((preState, props)=>{
            console.log(preState);
            console.dir(e);
            return (
                {
                    isToggleOn: !preState.isToggleOn,
                    id:n
                }
            )
        })
    }
    render(){
        return(
            // <button onClick={()=>{this.handleClick()}}>{JSON.stringify(this.state.isToggleOn)}</button>
            <button onClick={this.handleClick.bind(this,4)}>
                {JSON.stringify(this.state.isToggleOn)+'-'+this.state.id}
            </button>
        )
    }
}

function Item(props){
    const item = props.data
    return (
        <li>{item}</li>
    )
}

function List(props){
    const list = props.arr;
    return (
        <ul>
            {list.map((item) => <Item key={item.toString()}  data = {item}/>)}
        </ul>
    )
}

class FormComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            value:'bbb'
        }
        this.submitHandle = this.submitHandle.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    submitHandle(event){
        alert('you favourite item is ' + this.state.value);
        event.preventDefault()
    }
    handleChange(event){
        console.log(event);
        this.setState({value: event.target.value})
    }
    render(){
        return(
            <form onSubmit={this.submitHandle}>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="">pls select</option>
                    <option value="aaa">aaa</option>
                    <option value="bbb">bbb</option>
                    <option value="ccc">ccc</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        )
    }

}


class ChildComponent extends Component{
    constructor(props){
        super(props)
        this.changeHandle = this.changeHandle.bind(this)
    }
    changeHandle(event){
        //this.props.name = 5 prop为只读属性
        let val = event.target.value
        this.props.onchange(val)
    }
    render(){
        return (
            <div style={{border:'1px solid blue'}}>
                <input type="text" value={this.props.name} onChange={this.changeHandle} />
            </div>
        )
    }
}
class ParentComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'Parent default text'
        }
        this.inputChage = this.inputChage.bind(this)
        this.parentSetVal = this.parentSetVal.bind(this)
    }
    parentSetVal(){
        this.setState({ name:'xxxx' })
    }
    inputChage(val){
        this.setState({ name: val })
    }
    render(){
        return (
            <div style={{border:'1px solid red'}}>
                <div>{this.props.children}</div>
                {'Here is Parent Area ' + this.state.name} 
                <br/>
                <span onClick={this.parentSetVal}>CLICK ME</span>
                <ChildComponent 
                name={this.state.name} 
                onchange={this.inputChage}/>
            </div>
        )
    }
}

function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings() {
    return (
      <Repeat numTimes={10}>
        {(index) => <div key={index}>This is item {index} in the list</div>}
      </Repeat>
    );
}

class Greeting extends Component{
    render(){
        return (
            <div>hello {this.props.name}</div>
        )
    }
}
Greeting.propTypes = {
    name: PropTypes.string
}

class CustcomInputText extends Component{
    constructor(props){
        super(props)
        this.inputRef = React.createRef()
        this.focusTextInput = this.focusTextInput.bind(this)
    }
    focusTextInput(){
        this.inputRef.current.focus()
    }
    render(){
        return (
            <div>
                <input type="text" ref={this.inputRef} />
                <input type="button" value="Click Me" onClick={this.focusTextInput} />
            </div>
        )
    }
}

class CustcomInputText2 extends Component{
    constructor(props){
        super(props)
        this.textInput = null;
        this.setTextInputRef = element => {
            console.log(element)
            this.textInput = element
        }
        this.focusTextInput = () => {
            if(this.textInput) this.textInput.focus()
        }
    }
    render(){
        return (
            <div>
                <input type="text" ref={this.setTextInputRef} />
                <input type="button" value="Click Me" onClick={this.focusTextInput} />
            </div>
        )
    }
}

class AutoFocusInput extends Component{
    constructor(props){
        super(props)
        this.inputRef = React.createRef()
    }
    componentDidMount(){
        console.log(this.inputRef)
        this.inputRef.current.focusTextInput()
    }
    render(){
        return <CustcomInputText ref={this.inputRef} />
    }
}

class NameForm extends Component{
    constructor(props){
        super(props)
        this.submitHandle = this.submitHandle.bind(this)
    }
    submitHandle(event){
        console.log('submit value is :' + this.input.value)
        event.preventDefault()
    }
    componentDidMount(){
        console.log(this.input)
    }
    render(){
        return (
            <form onSubmit={this.submitHandle}>
                <input type="text" ref={ (element) => this.input = element } /><br/>
                <input type="submit" value="submit" />
            </form>
        )
    }
}

class FileInput extends Component{
    constructor(props){
        super(props)
        this.submitHandle = this.submitHandle.bind(this)
    }
    submitHandle(event){
        console.log(this.fileInput.files)
        console.log(`U selected file name is :${this.fileInput.files[0].name}`);
        event.preventDefault()
    }
    render(){
        return (
            <form onSubmit={this.submitHandle}>
                <input type="file" ref={ element => this.fileInput = element } /><br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const NameContext = React.createContext('zdgf');

class FatherContext extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'test'
        }
    }
    render(){
        return (
            <div>
                <NameContext.Provider value={this.state.name}>
                    {this.props.children}
                </NameContext.Provider>
            </div>
        )
    }
}

class ChildContext extends Component{
    render(){
        return (
            <div>
                <NameContext.Consumer>
                    {name => (
                        <div>
                            Hello {name} ,(ChildContext Component)
                            {this.props.children}
                        </div>
                    )}
                </NameContext.Consumer>
            </div>
        )
    }
}

class ChildContext1 extends Component{
    render(){
        return (
            <div>
                <NameContext.Consumer>
                    {name => (
                        <div>
                            Hello {name} ,(ChildContext1 Component)
                        </div>
                    )}
                </NameContext.Consumer>
            </div>
        )
    }
}


class Modal extends Component{
    constructor(props){
        super(props)
        this.modalRoot = document.getElementById('modal-root')
        this.el = document.createElement('div')
    }
    componentDidMount(){
        this.modalRoot.appendChild(this.el)
    }
    componentWillUnmount(){
        this.modalRoot.removeChild(this.el)
    }
    render(){
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        )
    }
}

class ModalComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
           showModal: false
        }
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }
    showModal(){
        this.setState({
            showModal: true
         })
    }
    hideModal(){
        this.setState({
            showModal: false
         })
    }
    render(){
        const modal = this.state.showModal ? 
        <Modal>
            <div className="modal">
                <button onClick={this.hideModal}>Hide modal</button>
            </div>
        </Modal>
        :
        null
        return (
            <div id="modal-box">
                <input type="button" onClick={this.showModal} value="showModal" />
                {modal}
            </div>
        )
    }
}

class Hello extends Component{
    render(){
        return (
            <div>Hello {this.props.name}</div>
        )
    }
}

class Welcome extends Component{
    render(){
        return (
            <div>welcome {this.props.name}</div>
        )
    }
}

function HocTest(WrappedComponent){
    return class NewComponent extends Component{
        constructor(props){
            super(props)
            this.state = { name: 'zdgf' }
        }
        render(){
            return <WrappedComponent name={this.state.name} />
        }
    }
}

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            arr:['aaa','bbb','ccc']
        }
    }
    render(){
        const HelloComponent = HocTest(Hello)
        const WelcomeComponent = HocTest(Welcome)
        return (
            <div>
                React App
                {/* <div id="modal-root"></div>
                <ModalComponent /> */}
                <HelloComponent />
                <WelcomeComponent />
            </div>
        )
    }
}