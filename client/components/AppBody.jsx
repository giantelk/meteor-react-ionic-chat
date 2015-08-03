let Transition = React.addons.CSSTransitionGroup;

AppBody = React.createClass({
  getInitialState() {
    return {
      modal: false
    }
  },
  ionModal(tab, content) {
    this.setState({
      modal: (
        <IonModal modalContent={content}>
          <div className="h1 title">{tab}</div>
          <button onClick={ () => this.setState({modal:false}) } className="button button-icon active">
            <i className="icon ion-ios-close-empty"></i>
          </button>
        </IonModal>
      )
    })
  },
  render() {
    let subheader = window.location.pathname == "/other" ? "has-subheader" : ""
    let classes = "content overflow-scroll has-header "+ subheader
    return (
      <div className="ionic-body">
        <div className="bar bar-header bar-light">
          <ReactRouter.Link className="button button-icon icon ion-gear-a" to={"/settings"}></ReactRouter.Link>
          <ReactRouter.Link className="h1 title" to={"/"}>App Name</ReactRouter.Link>
          <ReactRouter.Link className="button button-icon icon ion-heart" to={"/other"}></ReactRouter.Link>
        </div>

        {this.state.modal ? <Backdrop /> : false}
        <Transition transitionName="modal">
          {this.state.modal}
        </Transition>

        {window.location.pathname == "/other" ? <ConversationSubheader ionModal={this.ionModal} /> : false}

        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className={classes}>
              <ReactRouter.RouteHandler ionModal={this.ionModal} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
