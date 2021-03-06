import React, {Component} from "react";
import Hello from '../class/Hello';
import HtmlFile from '../class/Html';
import PhpController from '../class/Php';
import PhpClass from  '../class/PhpClass';
import DataBaseConnection from '../class/ConnectionClass';

class ViewData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',
            tableName: '',
            columnCount: '',

            tableData: [],
            serverTableError: '',
            colTableError: '',
            firstStep: true,
            secondStep: false,
            summery: false,
            finalView: false,

            generatedView: '',
            generatedController: '',
            generatedConnection: '',
            generatedSelectQuery: '',
        }
    };

    render() {
        const {
            finalView,tableData, summery, firstStep, secondStep, colTableError, serverTableError, serverName, serverUsername, serverPassword, serverDatabase, tableName, columnCount,
        } = this.state;
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-12 text-center sub-div">
                        Generate view for data in table.
                        <hr/>
                        This will generate Select Query, Data View table and connection class.
                        <hr/>
                    </div>
                </div>
                {firstStep ?
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-sm-cus">Server Details</p>
                        </div>
                        <div className="col-md-3">
                            <input name="serverName"
                                   onChange={e => this.handleInputChange(e)}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Name"
                                   className="text-input"
                                   value={this.state.serverName}
                            />
                        </div>

                        <div className="col-md-3">
                            <input name="serverUsername"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverUsername}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Username"
                                   className="text-input"/>
                        </div>

                        <div className="col-md-3">
                            <input name="serverPassword"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverPassword}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Server Password"
                                   className="text-input"/>
                        </div>

                        <div className="col-md-3">
                            <input name="serverDatabase"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.serverDatabase}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Database Name"
                                   className="text-input"/>
                        </div>


                        <div className="col-md-12">
                            <hr/>

                        </div>

                        <div className="col-md-12">
                            <p className="text-sm-cus">Table Details</p>
                        </div>
                        <div className="col-md-3">
                            <input name="tableName"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.tableName}
                                   required="required"
                                   type="text"
                                   placeholder="Enter Table Name"
                                   className="text-input"/>
                        </div>

                        <div className="col-md-3">
                            <input name="columnCount"
                                   onChange={e => this.handleInputChange(e)}
                                   value={this.state.columnCount}
                                   required="required"
                                   type="number"
                                   placeholder="Enter Column Count"
                                   className="text-input"/>
                            <p className="text-sm-cus">ID column automatically generated by system.</p>
                        </div>

                        <div className="col-md-4 offset-md-4 text-center">
                            <p className="error-text-sm-cus-two"> {serverTableError}</p>
                            <button onClick={(e) => this.generateTableAndServerData(e)} className="basic-button">Next
                            </button>
                        </div>
                    </div>
                    : null}
                {secondStep ?
                    <div className="row">
                        <div className="col-md-12 text-right">
                            <button onClick={ (e) => this.closeTableData(e)}
                                    className="material-icons material-icon-btns">close
                            </button>
                        </div>

                    </div>
                    : null}
                {secondStep ?
                    <div className="row table-view">
                        {this.createInputs()}
                        <div className="col-md-4 offset-md-4 text-center">
                            <p className="error-text-sm">{colTableError}</p>
                            <button onClick={(e) => this.generateColumns(e)} className="basic-button">
                                Next
                            </button>
                        </div>
                    </div> : null}
                {summery ?
                    <div className="row">
                        <div className="col-md-4">
                            <p className="text-sm-cus">Server Details</p>
                            <p>Server name - {serverName}</p>
                            <p>Server username - {serverUsername}</p>
                            <p>Server password - {serverPassword}</p>
                            <p>Server database - {serverDatabase}</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-sm-cus">Table Details</p>
                            <p>Table name - {tableName}</p>
                            <p>Column count - {columnCount}</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-sm-cus">Table column data</p>
                            <ol>
                                {tableData.map((data, id) =>
                                    <li key={id}>{data.columnName}</li>
                                )}
                            </ol>
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <button onClick={(e) => this.generateData(e)} className="basic-button">
                                Generate
                            </button>
                        </div>
                    </div> : null}
                {finalView?
                    <div className="row">
                        <div className="col-md-12">
                            <button className="basic-button-sm" onClick={(e) => this.resetData(e)}>Reset All
                            </button>
                            <button className="basic-button-sm" onClick={(e) => this.downloadInsert(e)}>Download
                            </button>
                        </div>
                        <div className="col-md-12 text-center">
                            This will not generate Create table query. you can use this with existing table
                        </div>
                        <div className="col-md-12">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#view-view"
                                       role="tab" aria-controls="home" aria-selected="true">HTML View</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#controller-view"
                                       role="tab" aria-controls="profile" aria-selected="false">Controller</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#select-view"
                                       role="tab" aria-controls="contact" aria-selected="false">Select Class</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="connection-tab" data-toggle="tab" href="#connection-view"
                                       role="tab" aria-controls="contact" aria-selected="false">Connection Class</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="view-view" role="form"
                                     aria-labelledby="home-tab">
                                    <pre className="code-view-pre">
                                        {this.state.generatedView}
                                    </pre>
                                </div>

                                <div className="tab-pane fade" id="controller-view" role="tabpanel"
                                     aria-labelledby="profile-tab"><pre className="code-view-pre">
                                    {this.state.generatedController}
                                </pre>
                                </div>

                                <div className="tab-pane fade" id="connection-view" role="tabpanel"
                                     aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">{this.state.generatedConnection}</pre>
                                </div>

                                <div className="tab-pane fade" id="select-view" role="tabpanel"
                                     aria-labelledby="contact-tab">
                                    <pre className="code-view-pre">
                                    {this.state.generatedSelectQuery}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    :null}
            </div>
        )
    }

    resetData(event){
        this.setState({
            serverName: '',
            serverUsername: '',
            serverPassword: '',
            serverDatabase: '',
            tableName: '',
            columnCount: '',
            tableData: [],
            serverTableError: '',
            colTableError: '',
            firstStep: true,
            secondStep: false,
            summery: false,
            finalView: false,

            generatedView: '',
            generatedController: '',
            generatedConnection: '',
            generatedSelectQuery: '',
        })
    }

    downloadInsert(event){
        const {
            generatedView,
            generatedController,
            generatedSelectQuery,
            generatedConnection,
            tableName,
        } = this.state;
        const fileData = [
            {
                "fileName": tableName + ".php", "fileContent": generatedView, "folder": "out"
            },
            {
                "fileName": tableName + "_controller.php", "fileContent": generatedController, "folder": "out"
            },
            {
                "fileName": "DBConnection.php", "fileContent": generatedConnection, "folder": "in"
            }
            ,
            {
                "fileName": "Select.php", "fileContent": generatedSelectQuery, "folder": "in"
            }
        ]
        Hello.downloadZip(tableName, fileData);
    }

    generateData(event) {
        const TableCols = [];
        for (let x = 0; x < this.state.tableData; x++) {
            TableCols.push(
                this.state.tableData[x].columnName
            )
        }
        this.setState({
            finalView: true,
            firstStep: false,
            secondStep: false,
            summery: false,
            generatedView: HtmlFile.generateView(this.state.tableName, this.state.tableData, "select", "yes", "no","no","no","no","no"),
            generatedController: PhpController.generateController(this.state.tableName, this.state.tableData.columnName, 'select', 'no', 'yes'),
            generatedConnection: DataBaseConnection.generateConnection(this.state.serverName, this.state.serverUsername, this.state.serverPassword,
                this.state.serverDatabase, "no", this.state.tableName, this.state.tableData),
            generatedSelectQuery: PhpClass.selectClass(this.state.tableName, this.state.tableData.columnName),
        })


    }

    generateColumns(event) {
        const ColumnNames = [];
        const ColNamesNullChecker = [];
        const TableData = [];
        for (let index = 0; index < this.state.columnCount; index++) {
            ColumnNames.push(
                {
                    'ColNames': 'columnName' + index
                }
            );

            ColNamesNullChecker.push(
                this.refs[ColumnNames[index].ColNames].value
            );
        }

        if (Hello.CheckNullStatus(ColNamesNullChecker)) {

            for (let x = 0; x < this.state.columnCount; x++) {
                TableData.push({
                    "columnName": this.refs[ColumnNames[x].ColNames].value,
                })
            }

            this.setState({
                tableData: TableData,
                secondStep: false,
                summery: true,
            });
        } else {
            this.setState({
                colTableError: 'All fields are required'
            })
        }
    }

    createInputs() {
        let Inputs = [];

        for (let input = 0; input < this.state.columnCount; input++) {
            Inputs.push(
                <div key={input} className="col-md-2 border-text-set-outer">
                    <div className="border-text-set">
                        <p className="text-sm-cus">Column name</p>
                        <input ref={'columnName' + input} className="custom-text-box" type="text"
                               name={'columnName' + input}
                               placeholder="Enter Column Name" required/>
                    </div>
                </div>
            );
        }
        return Inputs;
    }

    closeTableData(event) {
        this.setState({
            firstStep: true,
            secondStep: false
        })
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    generateTableAndServerData() {
        const {serverName, serverUsername, serverDatabase, tableName, columnCount} = this.state;
        const data = [serverName, serverUsername, serverDatabase, tableName, columnCount];
        if (this.checkNullStatus(data)) {
            this.setState({
                serverTableError: '',
                firstStep: false,
                secondStep: true
            })
        } else {
            this.setState({
                serverTableError: 'All fields are required'
            })
        }
    }

    checkNullStatus(data) {
        return Hello.CheckNullStatus(data);
    }
}

export default  ViewData;