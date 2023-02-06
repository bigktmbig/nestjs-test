

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
1/ Spec
    - normal post: id, title, content
    - paid post: id, title, content, regularPrice, salePrice
    - media post: id, title, content, thumbnail, cover

2/ generate
    - nest g mo Post /modules
    - nest g resource PaidPost /modules/post-module

3/ define entity
    import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
    
    @Entity()
    export class NormalPost {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      title: string;
    
      @Column()
      content: string;
    
      @Column({ default: true })
      isActive: boolean;
      
       @OneToOne(
          () => AddressEntity,
          {
            // Make sure that when you delete or update a user, it will affect the
            // corresponding `AddressEntity`
            cascade: true,
            // Make sure when you use `preload`, `AddressEntity` of the user will also
            // return (This means whenever you use any kind of `find` operations on
            // `UserEntity`, it would load this entity as well)
            eager: true
          }
        )
        @JoinColumn()
        address: AddressEntity;
    }
    
4/ Run test e2e
    npm run test:e2e