
// int64 就是long
export type StructureString = 'int64' | 'integer' | 'array' | 'object'

export enum BasePathEnum{ 
    task = '/bizTask' ,
    bbs = '/bbs' ,
    user = '/user' ,
    comm = '/comm',
}

export enum StructureStringEnum{
    'int64' = 'long',
    'integer' = 'integer',
    'number' = 'number',
    'array' = 'array',
    'string' = 'string',
    'object' = 'object',
} 


// ====================== Dto的定义 ==========================
export type KeyMode = {
    description: string
    format?: StructureString
    type: StructureString
}

export interface DefineInterface {
    [key: string]: {
        description: string
        properties: {
            [key: string]: KeyMode
        }
        title: string
        type: StructureString // 好像都是object
    }
}

// =========================== 接口定义 ===========================

export interface ParamsGetInterface {
    collectionFormat?: 'multi'
    description: string 
    in: "body" | 'query'
    items?: {
        format: 'int64'
        type: 'integer'
    }
    name: string // "detailInsertDto"
    required: boolean,
    type: StructureString
}

interface SchemaInterfaceWithItems {
    type?: StructureString // 如果有，好像都是array？
    items: SchemaInterface
}
    
interface SchemaInterface {
    $ref: string // "#/definitions/TmsDetailPhotoUploadDto"
    originalRef: string // "TmsDetailPhotoUploadDto"
}

export interface ParamsPostInterface {
    description: string // "detailInsertDto"
    in: "body"
    name: string // "detailInsertDto"
    required: true,
    schema: SchemaInterface & SchemaInterfaceWithItems // TODO 定位到dto中
}

export interface PathInterface {
    consumes: string[], // content-type
    operationId: string,
    parameters: ParamsPostInterface[] | ParamsGetInterface[]
    produces: string[]
    responses: any, // 响应暂时不需要解
    summary: string
    tags: string[]
}

export enum Method {
    POST = 'post',
    GET = 'get',
  }

  // TODO 二者选其一的定义方式 POST和get等职能有一个
export interface PathMethodInterface {
   /*  [key: string]: {
        [httpMethod: Method.GET]: PathInterface
    } */
}

// 版本信息的定义
interface InfoInterface {
}


// 版本信息的定义
interface TagInterface {
    description: string,
    name: string
}
 
// reqGetNewsList = ({pageNum=1,pageSize=10}) => request.get('/bizTask/index/getNewsListMini',{pageNum,pageSize})

export interface Template {
    summary: string  // TODO 字段类型也需要有jsdoc的生成
    basePath: BasePathEnum
    name: string,
    params: Object | any // TODO 需要额外定义吧,是这部分最复杂，最难的地方
    request: 'request' | 'axios' | 'ajax' // 封装的请求方式
    url: string
    method: Method
}

// swagger返回的定义
export interface Swagger {
    swagger: String,
    paths: PathMethodInterface
    basePath: String,
    definitions: DefineInterface
    info: InfoInterface,
    tags: TagInterface[],
}


