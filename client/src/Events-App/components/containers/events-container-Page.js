import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getEvents } from '../../actions';
import { Article } from '../../styled-components/global-theme';
import EventsList from '../presentation/EventsList';
import SearchSingleEvent from '../presentation/SearchSingleEvent';

class EventsContainer extends Component {

  componentDidMount() {
    this.props.getEvents()
  }

  checkLengthDesc = (paragraph) => {
    if(paragraph.length > 50) {
      return `${paragraph.slice(0,160)}...`
    }
    return paragraph
  }

  render() {
    const { loading, events } = this.props;
    
    return (
      <Article>   
        {
          loading ? 
            <h5>Loading...</h5> :
            events.map(item => <EventsList key={item.id} 
              title={item.title} desc={item.desc} checkLengthDesc={this.checkLengthDesc} location={item.location} image={item.imageUrl}/>).reverse()
              
            }
      </Article>
    )
  }
}

const mapStateToProps = state => ({
  events: Object.values(state.events),
  loading: state.loading
}) 

export default connect(mapStateToProps, {getEvents})(EventsContainer);