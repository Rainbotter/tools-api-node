export interface InfoResponse {

    name: string;
    version: string;
    monitoring: InfoMonitoringResponse;

}

export interface InfoMonitoringResponse {

    memory: InfoMemoryResponse[];

}


export interface InfoMemoryResponse {

    name: string;
    value: string;

}
