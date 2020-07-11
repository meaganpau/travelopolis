import React, { Component } from "react"
import styled from "@emotion/styled"
import axios from "axios"
import { Link } from "react-router-dom"
import { formatDate } from "../../util/helpers"
import { getToken } from "../../services/tokenServices"
import Card from "../Card"
import DoubleTitle from "../DoubleTitle"
import CreateNewCard from "./CreateNewCard"

const MyLink = ({ ...props }) => <Link {...props}>{props.children}</Link>

const TripList = styled("ul")`
    padding: 0;
    margin-top: 30px;
    list-style: none;
    display: grid;
    grid-template-columns: 303px 303px 303px;
    grid-gap: 45px 60px;
    justify-content: space-between;

    li {
        display: inline-block;
    }
`

const Triplink = styled(MyLink)`
    text-decoration: none;
`

class Trips extends Component {
    state = {
        trips: "",
        status: "Loading...",
    }

    getTrips = async (userID) => {
        const token = getToken()

        try {
            const res = await axios.get(`/api/trips/user/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.length) {
                this.setState({ trips: res.data })
            } else {
                this.setState({
                    status: "Looks like you don't have any trips yet!",
                })
            }
        } catch (e) {
            console.log(e)
            this.setState({ status: "Error loading trips." })
        }
    }

    componentDidMount() {
        this.setState({ user: this.props.user }, () => {
            this.getTrips(this.state.user._id)
        })
    }

    render() {
        const { trips, status } = this.state
        return (
            <React.Fragment>
                <DoubleTitle>My Trips</DoubleTitle>
                <TripList>
                    <li>
                        <Triplink to="/admin/add_trip">
                            <CreateNewCard name="+" subtext="Create New" />
                        </Triplink>
                    </li>
                    {trips !== ""
                        ? trips.map((trip) => {
                              const { _id, name, date } = trip
                              return (
                                  <li key={_id}>
                                      <Triplink to={`/admin/trip/${_id}`}>
                                          <Card
                                              key={_id}
                                              name={name}
                                              subtext={`Created: ${formatDate(
                                                  date
                                              )}`}
                                              cms={true}
                                          />
                                      </Triplink>
                                  </li>
                              )
                          })
                        : `${status}`}
                </TripList>
            </React.Fragment>
        )
    }
}

export default Trips
