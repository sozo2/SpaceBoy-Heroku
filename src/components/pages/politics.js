import React, { Component } from 'react';
import RecentWrapper from "../recent-section/recentWrapper"
import GridWrapper from "../article-grid/gridWrapper"

class Politics extends Component {
    render() {
      return (
        <div>
          <GridWrapper queryCategory="politics"/>
          <RecentWrapper sectionTitle="Politics"/>
        </div>
    )
  }
}

export default Politics;