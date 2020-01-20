import React, { Component } from "react";

export default class ViewApiCall extends Component {
  state = {
    loading: true,
    project: []
  };
  async componentDidMount() {
    const url = "http://localhost:8080/api/project";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ project: data, loading: false });
  }
  render() {
    const { loading, project } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <div>loading..</div>
        ) : (
          <div>
            <ul>
              {project.map(display => {
                console.log(display);
                const {
                  id,
                  projectName,
                  projectIdentifier,
                  description
                } = display;
                return (
                  <div key={id}>
                    <p>Project Name: {projectName}</p>
                    <p>Description: {description}</p>
                    <hr />
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
