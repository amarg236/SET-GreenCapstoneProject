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
class timeOutput extends React.Component{ //this is to support the clock, go ahead and skip down to testForm, I just kinda got hung up on this idea and couldn't stop.
	constructor(props){
		super(props);
		this.state={tme:0, tst:"tick"};
	}
	advnceClk(){ 
		//debug is commented out here because of the below error where I didn't have the spare brain cells to add a "return" to my render method.
		//window.x=new Date().toLocaleTimeString()
		var tmp = this.state; //This is a shallow copy if I remember right, so editing it pulls the whole thing out of the react chain by circumventing reacts whole "monitor the states for changes" thing
		tmp.tme=new Date().toLocaleTimeString(); //But we're going to set the actual state to the value used in this temporary one and hopefully that'll be a-ok.
		if(tmp.tst=="tick"){ //tick tock.
			tmp.tst="tock";
		}
		else{
			tmp.tst="tick";
		}
		this.setState(tmp);//yeah this method is pointless I could just roll it into the below call on mount but I'm not deleting it now it's to late lmao.
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
		return ce('p', null, [`${this.state.tme}`, ce('br', null,null), `${this.state.tst}`]);//DO YOU HAVE ANY IDEA HOW LONG I DROVE MYSELF INSANE BECAUSE I FORGOT TO ADD 'RETURN?' DON'T DO THAT HOURS. THAT'S HOW LONG
	}
}
//end of the clock stuff. IDK why I added it tbh.

//WINDOW VARIABLE FOR TESTING THAT I'M MAKING STUFF DEPENDENT ON
//Options:
//""
//hw
//dataTest
//sql/add
//sql/get
window.sendoff="";
//using this to just set that sendoff variable for ease of use
class sov extends React.Component{
	constructor(props){
		super(props);
		this.state={value:"", crnt:" "};
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
		console.log('build');
	}
	handleChange(event){//These HAVE to be named handle change and handle submit as far as I know. Else bad things happen
		this.setState({value:event.target.value, crnt:this.state.crnt});
		event.preventDefault();
	}
	handleSubmit(event){
		var tmp = this.state;
		tmp.crnt=tmp.value;
		this.setState(tmp);
		window.sendoff=this.state.value;
		event.preventDefault();
	}
	render(){
		return ce('form', {onSubmit:this.handleSubmit, className:"bname"},	[`Will send to /${this.state.crnt} `, ce('br',null,null), "New link: ", ce("input", {type:'text', onChange:this.handleChange}, null)]);
	}
}

//Note: if react objects crash they just refresh the page silently from what I've seen, so "nothing happens" but your code is broke
class testForm extends React.Component{
	constructor(props){
		super(props);
		this.state={value:"text box default", dscrptnVle:""};//This must always be an object for the purpose of setState. In an actual component use values from properties
		//this.extra; //You can just add new variables if you need them. That makes state management easier I guess if you use multipart stuff like I think I said not to at some point due to messyness.
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
		sendData(this.state.value, window.sendoff, this); //Note that I pass an OBJECT here. OBJECTS SHOULD BE pass by reference.
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
				ce('p', null, 'Sent to subdomain: ' + window.sendoff),
				ce('input', {type: 'text', value:this.state.value, onChange:this.handleChange}, null)
			]
		)
	}
}

ReactDOM.render([
	ce(sov, null, null),
	ce(testForm, null, null)],
	document.getElementById('main')
);