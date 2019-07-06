import React, { Component } from 'react';
import { Menu,Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

import * as authActions from '../../module/auth/actions';

class BackHeader extends Component {

    goBack=e=>{
        this.props.history.goBack();
    }
    render() {

        return(
            <Menu>
                <Menu.Item onClick={this.goBack}>
                    <Icon name="angle left"></Icon>
                </Menu.Item>
            </Menu>
        )
   
    }
}


export default withRouter(BackHeader);