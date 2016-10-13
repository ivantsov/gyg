import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GoogleMap from 'google-map-react';
import loadUser from '../api';

import './styles.css';

const timer = 10 * 1000; // 10 sec
const googleMapKey = 'AIzaSyD3B9aiCzl5NH8y4ZNwGgMyNfoPQUebMCQ';

export default class App extends Component {
    state = {
        user: null
    };

    componentDidMount() {
        this.updateData();
        setInterval(this.updateData, timer);
    }

    render() {
        const {user} = this.state;

        if (!user) {
            return null;
        }

        const {
            customerFirstName,
            activityTitle,
            activityCoordinateLatitude,
            activityCoordinateLongitude,
            activityPictureUrl
        } = user;

        return (
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={2000}
                transitionLeaveTimeout={2000}
            >
                <div key={customerFirstName}>
                    <div className="bg-image" style={{backgroundImage: `url(${activityPictureUrl})`}}/>
                    <div className="text">
                        <div>{customerFirstName}</div>
                        <div className="conjunction">at</div>
                        <div className="uppercase">{activityTitle}</div>
                    </div>
                    <div className="map">
                        <GoogleMap
                            bootstrapURLKeys={{key: googleMapKey}}
                            center={{
                                lat: activityCoordinateLatitude,
                                lng: activityCoordinateLongitude
                            }}
                            defaultZoom={10}
                            options={{zoomControl: false}}
                        />
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }

    updateData = async () => {
        const user = await loadUser();

        this.setState({user});
    }
}
