export interface Service
{

  identifier: string;
  description: string;
  active: boolean;
  price: number;
  clientNature: string;
  pk:number;
  code: string;
  roles: Role[];
}
export interface Role
{
  identifier: string;
  description: string;
  active: boolean;
  assignable: boolean;
  pk: number;
  code: string;
  menu: string;
}
