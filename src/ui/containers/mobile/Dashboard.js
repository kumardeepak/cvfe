// import liraries
import React, { PureComponent } from 'react';
import { Container, Tab, Tabs, TabHeading, Text, Card, CardItem, connectStyle, View, Content } from 'native-base';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AppCard from '../../components/mobile/Card';
import DashboardStyle from '../../styles/mobile/DashboardStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepoAPI from '../../../flux/actions/apis/repos';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import SearchBar from '../../components/mobile/SearchBar';
import FilterRepos from '../../../flux/actions/filterRepos'
// create a component
class Dashboard extends PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			repos: []
		}
	}

	componentDidMount() {
		let reposApi = new RepoAPI(2000)
		this.props.APITransport(reposApi)
	}

  componentDidUpdate(prevProps) {
		if (this.props.filteredRepos !== prevProps.filteredRepos) {
				if (Array.isArray(this.props.filteredRepos)) {
					this.setState({repos:this.props.filteredRepos})
				}
		}
		if(this.props.repos !== prevProps.repos) {
			if (Array.isArray(this.props.repos)) {
				this.setState({repos:this.props.repos})
			}
		}

}
	renderNormalCard(index, repo) {
		let title = _.get(repo, 'full_name');
		let summary = _.get(repo, 'description');
		let avatar = _.get(repo, 'owner')
		let name = _.get(repo, 'name')
		let size = _.get(repo, 'size')
		return (
			<AppCard cardContent={repo} key={index}
				title={title}
				summary={summary}
				name={name}
				size={size}
				avatar={avatar} />
		)
	}
	handleSearch(text) {
		this.props.FilterRepos(this.props.repos, text)
}
	render() {
		const { style } = this.props;
		const { cardContainer, cardItemText } = style;
		return (
			// <StyleProviderThemed>
			<Container>
				<Content>
					<Tabs>
						<Tab heading={<TabHeading><Text>Overview</Text></TabHeading>}>
							<Card style={cardContainer}>
								<CardItem>
									<Text style={cardItemText}>CardTab1</Text>
								</CardItem>
							</Card>
						</Tab>
						<Tab heading={<TabHeading><Text>Repositories</Text></TabHeading>}>
							<SearchBar placeholder="Search" textChangeHandler={this.handleSearch.bind(this)} serachText={ ''} />
							{this.state.repos && Array.isArray(this.state.repos) &&
								this.state.repos.map((repo, index) => {
									return this.renderNormalCard(index, repo)
								})
							}

						</Tab>
						<Tab heading={<TabHeading><Text>Stars</Text></TabHeading>}>
							<Card style={cardContainer}>
								<CardItem>
									<Text style={cardItemText}>CardTab3</Text>
								</CardItem>
							</Card>
						</Tab>
					</Tabs>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		apistatus: state.apistatus,
		repos: state.repos,
		filteredRepos: state.filteredRepos
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		APITransport: APITransport,
		FilterRepos
	}, dispatch)
}



// make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(connectStyle('DASHBOARD.STYLE', DashboardStyle)(Dashboard));
