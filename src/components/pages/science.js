import React, { Component } from 'react';
import RecentWrapper from "../recent-section/recentWrapper"
import GridWrapper from "../article-grid/gridWrapper"

class Science extends Component {
    render() {
      return (
        <div>
          <GridWrapper queryCategory="science"/>
          <RecentWrapper sectionTitle="Science"/>
        </div>
    )
  }
}

export default Science;