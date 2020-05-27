import React from "react";
import Paper from "@material-ui/core/Paper";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Avatar from "material-ui/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { grey900 } from "material-ui/styles/colors";

const BrowserUsage = props => {
  const styles = {
    paper: {
      minHeight: 350,
      padding: 10,
      backgroundColor: grey900
    },
    legend: {
      paddingTop: 10
    },
    pieChartDiv: {
      height: 240,
      textAlign: "center"
    },
    title: {
      color: "white"
    }
  };

  const { data } = props;

  return (
    <Paper style={styles.paper}>
      <span className="title">Usage Statistics</span>
      <div>
        <div>
          <div style={styles.pieChartDiv}>
            <ResponsiveContainer>
              <PieChart>
                <Pie innerRadius={70} outerRadius={120} data={data} fill="#8884d8">
                  {data.map(item => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div style={styles.legend}>
            <div style={styles.legend}>
              <List>
                {data.map(item => (
                  <ListItem style={styles.title} key={item.name} leftAvatar={<Avatar icon={item.icon} backgroundColor={item.color} />}>
                    {item.name}
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

// BrowserUsage.propTypes = {
//   data: PropTypes.array
// };

export default BrowserUsage;
