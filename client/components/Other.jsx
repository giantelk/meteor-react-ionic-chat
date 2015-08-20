let Transition = React.addons.CSSTransitionGroup;


Other = React.createClass({
  getInitialState() {
    return {
      isShowModal: false
    }
  },
  
  showIonModal( value ) {
    this.setState( {isShowModal: value} );
  },

  render() {

    console.log("Other(), render(), this.state.isShowModal" + this.state.isShowModal);

    return (
      <span>
        <h1>other</h1>

        <ConversationSubheader showIonModal={this.showIonModal} />

        {this.state.isShowModal ? <Backdrop /> : false}

        <Transition transitionName="modal">
          {
            this.state.isShowModal ? 
              <myIonModal 
                tab="Find friends" 
                content={"Stuff"} 
                showIonModal={this.showIonModal} /> 
            : 
              null
          }
        </Transition>

      </span>
    );
  }
});


ConversationSubheader = React.createClass({

  handleClick() {
    console.log("ConversationSubheader(), handleClick()");
    
    this.props.showIonModal( true );
  },

  render() {
    return (
      <div className="bar bar-subheader">
        <button className="button button-clear button-positive">Edit</button>
        <h2 className="title"></h2>
        <button 
          className="button button-icon icon ion-compose" 
          onClick={ this.handleClick }>
        </button>
      </div>
    )
  }
})


myIonModal = React.createClass({
  render() {
    return (
        <IonModal modalContent={this.props.content}>
          <div className="h1 title">{this.props.tab}</div>
          <button 
            onClick={ () => {this.props.showIonModal(false) } } 
            className="button button-icon active">
              <i className="icon ion-ios-close-empty"></i>
          </button>
        </IonModal>
    )
  }
})


NewConversationModal = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handle = Meteor.subscribe("usernames");
    return {
      usernamesLoading: !handle.ready(),
      usernames: Meteor.users.find().fetch(),
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },
  render() {
    console.log("NewConversationModal(), this.data.usernamesLoading = " + this.data.usernamesLoading);
    console.log("NewConversationModal(), this.data.usernames = " + this.data.usernames);
    
    if (this.data.usernamesLoading) {
      return <AppLoading />
    }

    return (
      <div className="list">
        this.data.usernames.map((user) => {
          <div className="item item-avatar">
            <img src={user.profile.image} />
            <h2>{user.username}</h2>
          </div>
        })
      </div>
    )
  }
})
