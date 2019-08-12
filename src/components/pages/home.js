import React, { Component } from 'react';
import RecentWrapper from "../recent-section/recentWrapper"
import GridWrapper from "../article-grid/gridWrapper"

class Home extends Component {
    render() {
      return (
        <div>
          <GridWrapper queryCategory="all"/>
          <RecentWrapper sectionTitle="All"/>
        </div>
    )
  }
}

export default Home;