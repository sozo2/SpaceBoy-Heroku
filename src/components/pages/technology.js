import React, { Component } from 'react';
import RecentWrapper from "../recent-section/recentWrapper"
import GridWrapper from "../article-grid/gridWrapper"

class Tech extends Component {
    render() {
      return (
        <div>
          <GridWrapper queryCategory="tech"/>
          <RecentWrapper sectionTitle="Tech"/>
        </div>
    )
  }
}

export default Tech;