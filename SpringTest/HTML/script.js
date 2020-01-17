//Rum and Coke upload, code here *should work* but that's all I'm saying.
//Like... a lot of rum. and coke. Coke isn't very good for you. I mean, it cleans car batteries. I don't think I'm tougher than a car battery tbh.

//React pushes JSX to make your life simple. I didn't feel like setting it up when I learned react so I don't use it.
//If you set it up and like it more power to you.
const ce = React.createElement; //makes life easier to create elements

function host(txt=""){ //Get the host and append text to it
	return "http://localhost:8080/"+txt
};
//sends off some data to the specified host and fetches the response
//you MUST pass an object here (that implements .update(dta) for this methods use), as objects are pass by reference.
async function sendData(dta, hst="", obj){
	fd = new FormData() // build a form
	fd.append('nfo', dta); //append data
	//make a response by calling fetch
	v = await fetch(host(hst), {method:'POST', body: fd})
	.then(function(x){return x.text()}).then(function(x){obj.update(x)});//YES doing a .then(function).then(function{call function}) is needed as far as I can figure.
};
window.x="fuck off";
class timeOutput extends React.Component{ //this is to support the clock, go ahead and skip down to testForm, I just kinda got hung up on this idea and couldn't stop.
	constructor(props){
		super(props);
		this.state={tme:0};
	}
	advnceClk(){ //remember helpers go before their calls. This isn't compiled so putting this below it's call results in bad things.
		//debug is commented out here because of the below error where I didn't have the spare brain cells to add a "return" to my render method.
		//window.x=new Date().toLocaleTimeString()
		this.setState({tme:new Date().toLocaleTimeString()});//window.x}); //yeah this method is pointless I could just roll it into the below call on mount but I'm not deleting it now it's to late lmao.
		//console.log(window.x);
	}
	//Some code for a clock that I wanted to add for the sake of having a clock
	//based off of https://reactjs.org/docs/state-and-lifecycle.html
	//I spent WAY to much time on this
	componentDidMount(){//This is build in for when component mounts, also a componentDidUnmount() for when it's gone
		this.timerID = setInterval(
			() => this.advnceClk(), 1000
		) //() => [code] should be the same as function(){[code]} see https://www.w3schools.com/js/js_arrow_function.asp
	}
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	render(){
		return ce('p', null, `${this.state.tme}`);//DO YOU HAVE ANY IDEA HOW LONG I DROVE MYSELF INSANE BECAUSE I FORGOT TO ADD 'RETURN?' DON'T DO THAT HOURS. THAT'S HOW LONG
	}
}
//end of the clock stuff. IDK why I added it tbh.

//Note: if react objects crash they just refresh the page silently from what I've seen, so "nothing happens" but your code is broke
class testForm extends React.Component{
	constructor(props){
		super(props);
		this.state={value:"text box default", dscrptnVle:"description default"};//This must always be an object for the purpose of setState. In an actual component use values from properties
		this.time=0; //You can just add new variables if you need them. That makes state management easier I guess if you use multipart stuff like I think I said not to at some point due to messyness.
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		//btw I name things in general by taking out all vowels (a, e, i, o, u, y) that do not being and/or end a word, and camel casing multiple words. "Tree" becomes "tre" and "big cheese" becomes "bgChse"
		
	}
	handleChange(event){//don't make overly complex states, that looks like it'd get ugly fast. Many simple objects linked to a big object sounds/seems better
		//setting input value to 
		this.setState({value: event.target.value, dscrptnVle:this.state.dscrptnVle}); //the aformentioned setState that only takes objects because why tf not.
		event.preventDefault();
	}
	handleSubmit(event){
		//window.alert('submission made: ' + this.state.value); //Alert for testing
		sendData(this.state.value, "dataTest", this); //Note that I pass an OBJECT here. OBJECTS are pass by reference.
		event.preventDefault(); //This handles stuff after submission happens. YOU ALWAYS NEED TO PREVENT DEFAULT, BE IT HERE OR IN YOUR HANDLER UNLESS YOU LIKE ENDLESS PAIN AND ETERNAL SUFFERING AND ACTUALLY WANT TO REFRESH THE PAGE YOU MAD LAD
	}
	update(dta){//used by sendData to update whatever needs to be updated. Can be whatever really.
		this.setState({value:this.state.value, dscrptnVle:dta});
	}
	render(){
		return ce('form', {onSubmit:this.handleSubmit, className:'aName'},
			[ //nested level 1
			//The JSX code here would be different, see: https://reactjs.org/docs/react-without-jsx.html
				[ce(timeOutput,null, null)],
				ce('p', null, `Last response recieved: ${this.state.dscrptnVle}`),//Note HTML doesn't seem to work inside the `[text]` syntax, JSX exists to solve this I think.
				ce('input', {type: 'text', value:this.state.value, onChange:this.handleChange}, null)
			]
		)
	}
}
ReactDOM.render([ce(testForm, null, null)], document.getElementById('main'));