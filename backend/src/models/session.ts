import {
  Table, Column, Model, AllowNull, PrimaryKey, AutoIncrement,
} from 'sequelize-typescript';

@Table
export default class Session extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
    id: number;

  @AllowNull(false)
  @Column
    pomodoroCount: number;

  @AllowNull(false)
  @Column
    elapsedTime: number;
}
